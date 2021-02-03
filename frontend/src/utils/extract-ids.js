import { applySpec, map, prop } from 'ramda';

/**
 * Returns a list of `{ params: { id } }` objects where the `id` value
 * is pulled from each element in a given array or objects.
 *
 * @function
 * @param {{ [id]: string }[]} items A list of objects containing a `id` property.
 * @returns {{ params: { id: string } }[]} A list of `id` params.
 */
const extractIds = map(applySpec({ params: { id: prop('id') } }));

export default extractIds;
