import type { WalnutContext } from './walnut';

/** @walnut_method
 * name: Handle Browser Dialog
 * description: Handle the next browser dialog by ${action} with optional prompt text ${promptText}
 * actionType: custom_handle_browser_dialog
 * context: web
 * needsLocator: false
 * category: Dialog
 */
export async function handleBrowserDialog(ctx: WalnutContext) {
  const action = ctx.args[0];
  const promptText = ctx.args[1];

  if (action !== 'accept' && action !== 'dismiss') {
    throw new Error('Invalid dialog action. Use "accept" or "dismiss".');
  }

  await ctx.handleDialog(action, promptText);
  ctx.log('Handled browser dialog: ' + action + (promptText ? ' with text "' + promptText + '"' : ''));
}
