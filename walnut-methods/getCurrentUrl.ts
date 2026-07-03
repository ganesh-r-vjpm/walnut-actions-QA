import type { WalnutContext, WalnutWebContext } from './walnut';

/** @walnut_method
 * name: Get Current URL
 * description: Get the current page URL and store in $[currentUrl]
 * actionType: custom_get_current_url
 * context: web
 * needsLocator: false
 * category: Navigation
 */
export async function getCurrentUrl(ctx: WalnutWebContext) {
  // args[0] = "currentUrl" (from $[currentUrl]) — the runtime variable name to store into
  const url = await ctx.getUrl();
  ctx.setVariable(ctx.args[0], url);
  ctx.log('Stored current URL: ' + url + ' → $[' + ctx.args[0] + ']');
}
