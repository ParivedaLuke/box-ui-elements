/**
 * @flow
 * @file Helper for the box search api
 * @author Box
 */

import Base from './Base';
import FileAPI from './File';
import FolderAPI from './Folder';
import WebLinkAPI from '../api/WebLink';
import flatten from '../util/flatten';
import sort from '../util/sorter';
import { FIELDS_TO_FETCH, CACHE_PREFIX_SEARCH } from '../constants';
import getBadItemError from '../util/error';
import type {
    BoxItemCollection,
    FlattenedBoxItem,
    FlattenedBoxItemCollection,
    SortBy,
    SortDirection,
    Collection
} from '../flowTypes';

const LIMIT_ITEM_FETCH = 200;

class Search extends Base {
    /**
     * @property {number}
     */
    offset: number;

    /**
     * @property {string}
     */
    id: string;

    /**
     * @property {string}
     */
    key: string;

    /**
     * @property {string}
     */
    query: string;

    /**
     * @property {string}
     */
    sortBy: SortBy;

    /**
     * @property {string}
     */
    sortDirection: SortDirection;

    /**
     * @property {Function}
     */
    successCallback: Function;

    /**
     * @property {Function}
     */
    errorCallback: Function;

    /**
     * @property {Array}
     */
    itemCache: string[];

    /**
     * Creates a key for the cache
     *
     * @param {string} id folder id
     * @param {string} query search string
     * @return {string} key
     */
    getEncodedQuery(query: string): string {
        return encodeURIComponent(query);
    }

    /**
     * Creates a key for the cache
     *
     * @param {string} id folder id
     * @param {string} query search string
     * @return {string} key
     */
    getCacheKey(id: string, query: string): string {
        return `${CACHE_PREFIX_SEARCH}${id}|${query}`;
    }

    /**
     * URL for search api
     *
     * @param {string} [id] optional file id
     * @return {string} base url for files
     */
    getUrl(): string {
        return `${this.getBaseUrl()}/search`;
    }

    /**
     * Tells if a folder has its items all loaded
     *
     * @return {boolean} if items are loaded
     */
    isLoaded(): boolean {
        if (!this.getCache().has(this.key)) {
            return false;
        }
        const { item_collection = {} }: FlattenedBoxItem = this.getCache().get(this.key);
        return !!item_collection.isLoaded;
    }

    /**
     * Sorts and returns the results
     *
     * @return {void}
     */
    finish(): void {
        if (this.isDestroyed()) {
            return;
        }

        const search: FlattenedBoxItem = this.getCache().get(this.key);
        const sortedSearch: FlattenedBoxItem = sort(search, this.sortBy, this.sortDirection, this.cache);
        const { item_collection }: FlattenedBoxItem = sortedSearch;
        if (!item_collection) {
            throw getBadItemError();
        }

        const { entries, total_count }: FlattenedBoxItemCollection = item_collection;
        if (!Array.isArray(entries) || typeof total_count !== 'number') {
            throw getBadItemError();
        }

        const percentLoaded: number = total_count === 0 ? 100 : entries.length * 100 / total_count;
        const collection: Collection = {
            percentLoaded,
            id: this.id,
            sortBy: this.sortBy,
            sortDirection: this.sortDirection,
            items: entries.map((key: string) => this.getCache().get(key))
        };
        this.successCallback(collection);
    }

    /**
     * Handles the folder search response
     *
     * @param {Object} response
     * @return {void}
     */
    searchSuccessHandler = (response: BoxItemCollection): void => {
        if (this.isDestroyed()) {
            return;
        }

        const { entries, total_count }: BoxItemCollection = response;
        if (!Array.isArray(entries) || typeof total_count !== 'number') {
            throw getBadItemError();
        }

        const flattened: string[] = flatten(
            entries,
            new FolderAPI(this.options),
            new FileAPI(this.options),
            new WebLinkAPI(this.options)
        );
        this.itemCache = (this.itemCache || []).concat(flattened);
        const isLoaded: boolean = this.itemCache.length === total_count;

        this.getCache().set(this.key, {
            item_collection: Object.assign({}, response, {
                isLoaded,
                entries: this.itemCache
            })
        });

        if (!isLoaded) {
            this.offset += LIMIT_ITEM_FETCH;
            this.searchRequest();
        }

        this.finish();
    };

    /**
     * Handles the search error
     *
     * @param {Error} error fetch error
     * @return {void}
     */
    searchErrorHandler = (error: Error): void => {
        if (this.isDestroyed()) {
            return;
        }
        this.errorCallback(error);
    };

    /**
     * Does the network request
     *
     * @return {void}
     */
    searchRequest(): void {
        if (this.isDestroyed()) {
            return;
        }

        this.xhr
            .get(this.getUrl(), {
                offset: this.offset,
                query: this.query,
                ancestor_folder_ids: this.id,
                limit: LIMIT_ITEM_FETCH,
                fields: FIELDS_TO_FETCH
            })
            .then(this.searchSuccessHandler)
            .catch(this.searchErrorHandler);
    }

    /**
     * Gets a box folder and its items
     *
     * @param {string} id folder id
     * @param {string} query search string
     * @param {string} sortBy sort by field
     * @param {string} sortDirection sort direction
     * @param {Function} successCallback Function to call with results
     * @param {Function} errorCallback Function to call with errors
     * @param {boolean} forceUpdate Bypasses the cache
     * @return {void}
     */
    search(
        id: string,
        query: string,
        sortBy: SortBy,
        sortDirection: SortDirection,
        successCallback: Function,
        errorCallback: Function,
        forceFetch: boolean = false
    ): void {
        if (this.isDestroyed()) {
            return;
        }

        // Save references
        this.offset = 0;
        this.query = this.getEncodedQuery(query);
        this.id = id;
        this.key = this.getCacheKey(id, this.query);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;

        // Clear the cache if needed
        if (forceFetch) {
            this.getCache().unset(this.key);
        }

        // Return the Cache value if it exists
        if (this.isLoaded()) {
            this.finish();
            return;
        }

        // Make the XHR request
        this.searchRequest();
    }
}

export default Search;
