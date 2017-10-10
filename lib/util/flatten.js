/**
 * 
 * @file Function to flatten an item list
 * @author Box
 */

import getBadItemError from './error';
import { TYPE_FOLDER, TYPE_FILE, TYPE_WEBLINK } from '../constants';


/**
 * Takes an item list and flattens it by moving
 * all item entries into the cache and replacing the list
 * entries with references to those items in the cache.
 * Web links are trated as files.
 *
 * @param {Array} list to flatten
 * @param {Folder} folderAPI api for files
 * @param {File} fileAPI api for files
 * @param {WebLink} weblinkAPI api for web links
 * @return {Array} list with items replaced with reference keys
 */
export default function (list, folderAPI, fileAPI, weblinkAPI) {
    var items = [];
    list.forEach(function (item) {
        var id = item.id,
            type = item.type;

        if (!id || !type) {
            throw getBadItemError();
        }

        var api = void 0;
        switch (type) {
            case TYPE_FOLDER:
                api = folderAPI;
                break;
            case TYPE_FILE:
                api = fileAPI;
                break;
            case TYPE_WEBLINK:
                api = weblinkAPI;
                break;
            default:
                throw new Error('Unknown Type!');
        }

        var cache = api.getCache();
        var key = api.getCacheKey(id);

        if (cache.has(key)) {
            cache.merge(key, item);
        } else {
            cache.set(key, item);
        }
        items.push(key);
    });
    return items;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsYXR0ZW4uanMiXSwibmFtZXMiOlsiZ2V0QmFkSXRlbUVycm9yIiwiVFlQRV9GT0xERVIiLCJUWVBFX0ZJTEUiLCJUWVBFX1dFQkxJTksiLCJsaXN0IiwiZm9sZGVyQVBJIiwiZmlsZUFQSSIsIndlYmxpbmtBUEkiLCJpdGVtcyIsImZvckVhY2giLCJpdGVtIiwiaWQiLCJ0eXBlIiwiYXBpIiwiRXJyb3IiLCJjYWNoZSIsImdldENhY2hlIiwia2V5IiwiZ2V0Q2FjaGVLZXkiLCJoYXMiLCJtZXJnZSIsInNldCIsInB1c2giXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQSxPQUFPQSxlQUFQLE1BQTRCLFNBQTVCO0FBQ0EsU0FBU0MsV0FBVCxFQUFzQkMsU0FBdEIsRUFBaUNDLFlBQWpDLFFBQXFELGNBQXJEOzs7QUFPQTs7Ozs7Ozs7Ozs7O0FBWUEsZUFBZSxVQUFTQyxJQUFULEVBQTBCQyxTQUExQixFQUE2Q0MsT0FBN0MsRUFBNERDLFVBQTVELEVBQTJGO0FBQ3RHLFFBQU1DLFFBQWtCLEVBQXhCO0FBQ0FKLFNBQUtLLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQW1CO0FBQUEsWUFDcEJDLEVBRG9CLEdBQ0VELElBREYsQ0FDcEJDLEVBRG9CO0FBQUEsWUFDaEJDLElBRGdCLEdBQ0VGLElBREYsQ0FDaEJFLElBRGdCOztBQUU1QixZQUFJLENBQUNELEVBQUQsSUFBTyxDQUFDQyxJQUFaLEVBQWtCO0FBQ2Qsa0JBQU1aLGlCQUFOO0FBQ0g7O0FBRUQsWUFBSWEsWUFBSjtBQUNBLGdCQUFRRCxJQUFSO0FBQ0ksaUJBQUtYLFdBQUw7QUFDSVksc0JBQU1SLFNBQU47QUFDQTtBQUNKLGlCQUFLSCxTQUFMO0FBQ0lXLHNCQUFNUCxPQUFOO0FBQ0E7QUFDSixpQkFBS0gsWUFBTDtBQUNJVSxzQkFBTU4sVUFBTjtBQUNBO0FBQ0o7QUFDSSxzQkFBTSxJQUFJTyxLQUFKLENBQVUsZUFBVixDQUFOO0FBWFI7O0FBY0EsWUFBTUMsUUFBZUYsSUFBSUcsUUFBSixFQUFyQjtBQUNBLFlBQU1DLE1BQWNKLElBQUlLLFdBQUosQ0FBZ0JQLEVBQWhCLENBQXBCOztBQUVBLFlBQUlJLE1BQU1JLEdBQU4sQ0FBVUYsR0FBVixDQUFKLEVBQW9CO0FBQ2hCRixrQkFBTUssS0FBTixDQUFZSCxHQUFaLEVBQWlCUCxJQUFqQjtBQUNILFNBRkQsTUFFTztBQUNISyxrQkFBTU0sR0FBTixDQUFVSixHQUFWLEVBQWVQLElBQWY7QUFDSDtBQUNERixjQUFNYyxJQUFOLENBQVdMLEdBQVg7QUFDSCxLQTlCRDtBQStCQSxXQUFPVCxLQUFQO0FBQ0giLCJmaWxlIjoiZmxhdHRlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmxvd1xyXG4gKiBAZmlsZSBGdW5jdGlvbiB0byBmbGF0dGVuIGFuIGl0ZW0gbGlzdFxyXG4gKiBAYXV0aG9yIEJveFxyXG4gKi9cclxuXHJcbmltcG9ydCBnZXRCYWRJdGVtRXJyb3IgZnJvbSAnLi9lcnJvcic7XHJcbmltcG9ydCB7IFRZUEVfRk9MREVSLCBUWVBFX0ZJTEUsIFRZUEVfV0VCTElOSyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0eXBlIHsgQm94SXRlbSB9IGZyb20gJy4uL2Zsb3dUeXBlcyc7XHJcbmltcG9ydCB0eXBlIEZpbGUgZnJvbSAnLi4vYXBpL0ZpbGUnO1xyXG5pbXBvcnQgdHlwZSBGb2xkZXIgZnJvbSAnLi4vYXBpL0ZvbGRlcic7XHJcbmltcG9ydCB0eXBlIFdlYkxpbmsgZnJvbSAnLi4vYXBpL1dlYkxpbmsnO1xyXG5pbXBvcnQgdHlwZSBDYWNoZSBmcm9tICcuL0NhY2hlJztcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhbiBpdGVtIGxpc3QgYW5kIGZsYXR0ZW5zIGl0IGJ5IG1vdmluZ1xyXG4gKiBhbGwgaXRlbSBlbnRyaWVzIGludG8gdGhlIGNhY2hlIGFuZCByZXBsYWNpbmcgdGhlIGxpc3RcclxuICogZW50cmllcyB3aXRoIHJlZmVyZW5jZXMgdG8gdGhvc2UgaXRlbXMgaW4gdGhlIGNhY2hlLlxyXG4gKiBXZWIgbGlua3MgYXJlIHRyYXRlZCBhcyBmaWxlcy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gbGlzdCB0byBmbGF0dGVuXHJcbiAqIEBwYXJhbSB7Rm9sZGVyfSBmb2xkZXJBUEkgYXBpIGZvciBmaWxlc1xyXG4gKiBAcGFyYW0ge0ZpbGV9IGZpbGVBUEkgYXBpIGZvciBmaWxlc1xyXG4gKiBAcGFyYW0ge1dlYkxpbmt9IHdlYmxpbmtBUEkgYXBpIGZvciB3ZWIgbGlua3NcclxuICogQHJldHVybiB7QXJyYXl9IGxpc3Qgd2l0aCBpdGVtcyByZXBsYWNlZCB3aXRoIHJlZmVyZW5jZSBrZXlzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihsaXN0OiBCb3hJdGVtW10sIGZvbGRlckFQSTogRm9sZGVyLCBmaWxlQVBJOiBGaWxlLCB3ZWJsaW5rQVBJOiBXZWJMaW5rKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3QgaXRlbXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBsaXN0LmZvckVhY2goKGl0ZW06IEJveEl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCB7IGlkLCB0eXBlIH06IEJveEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgIGlmICghaWQgfHwgIXR5cGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgZ2V0QmFkSXRlbUVycm9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXBpO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRZUEVfRk9MREVSOlxyXG4gICAgICAgICAgICAgICAgYXBpID0gZm9sZGVyQVBJO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVFlQRV9GSUxFOlxyXG4gICAgICAgICAgICAgICAgYXBpID0gZmlsZUFQSTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRZUEVfV0VCTElOSzpcclxuICAgICAgICAgICAgICAgIGFwaSA9IHdlYmxpbmtBUEk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBUeXBlIScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2FjaGU6IENhY2hlID0gYXBpLmdldENhY2hlKCk7XHJcbiAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgPSBhcGkuZ2V0Q2FjaGVLZXkoaWQpO1xyXG5cclxuICAgICAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgY2FjaGUubWVyZ2Uoa2V5LCBpdGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZS5zZXQoa2V5LCBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbXMucHVzaChrZXkpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaXRlbXM7XHJcbn1cclxuIl19