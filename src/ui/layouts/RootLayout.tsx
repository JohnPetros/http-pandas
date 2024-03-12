import { PropsWithChildren } from '@kitajs/html'

type RootLayoutProps = {
  scripts: string[]
} & PropsWithChildren

export const RootLayout = ({ children, scripts }: RootLayoutProps) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>
      <title>Hello World</title>
  </head>
    <body class="bg-neutral-800 p-3">
        ${children}
  
      <script>
        lucide.createIcons()
      </script>
  
      
      ${scripts.map((script) => `<script>${script}</script>`)}
  
      <script>
        // INITIALIZATION OF CLIPBOARD
        // =======================================================
        (function() {
          window.addEventListener('load', () => {
            const $clipboards = document.querySelectorAll('.js-clipboard');
            $clipboards.forEach((el) => {
              const isToggleTooltip = HSStaticMethods.getClassProperty(el, '--is-toggle-tooltip') === 'false' ? false : true;
              const clipboard = new ClipboardJS(el, {
                text: (trigger) => {
                  const clipboardText = trigger.dataset.clipboardText;
  
                  if (clipboardText) return clipboardText;
  
                  const clipboardTarget = trigger.dataset.clipboardTarget;
                  const $element = document.querySelector(clipboardTarget);
  
                  if (
                    $element.tagName === 'SELECT'
                    || $element.tagName === 'INPUT'
                    || $element.tagName === 'TEXTAREA'
                  ) return $element.value
                  else return $element.textContent;
                }
              });
              clipboard.on('success', () => {
                const $default = el.querySelector('.js-clipboard-default');
                const $success = el.querySelector('.js-clipboard-success');
                const $successText = el.querySelector('.js-clipboard-success-text');
                const successText = el.dataset.clipboardSuccessText || '';
                const tooltip = el.closest('.hs-tooltip');
                const $tooltip = HSTooltip.getInstance(tooltip, true);
                let oldSuccessText;
  
                if ($successText) {
                  oldSuccessText = $successText.textContent
                  $successText.textContent = successText
                }
                if ($default && $success) {
                  $default.style.display = 'none'
                  $success.style.display = 'block'
                }
                if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
                if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
  
                setTimeout(function () {
                  if ($successText && oldSuccessText) $successText.textContent = oldSuccessText;
                  if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
                  if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
                  if ($default && $success) {
                    $success.style.display = '';
                    $default.style.display = '';
                  }
                }, 800);
              });
            });
          })
        })()
      </script>
      
    </body>
  </html>`
}
