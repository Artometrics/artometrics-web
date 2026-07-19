import { useMemo } from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const FALLBACK_SCRIPT = `
(function () {
  document.querySelectorAll('.art-chart-live').forEach(function (el) {
    var fb = el.getAttribute('data-fallback');
    if (!fb) return;
    el.innerHTML = '';
    var img = document.createElement('img');
    img.src = fb;
    img.alt = el.getAttribute('data-title') || 'Chart';
    img.style.width = '100%';
    img.style.height = 'auto';
    el.appendChild(img);
    el.classList.add('art-chart-live--static', 'art-chart-live--ready');
  });
})();
true;
`;

function wrapHtml(html: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://artometrics.com/css/artometrics-article.css" />
<style>
  body {
    margin: 0;
    padding: 0 4px 24px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    color: #171717;
    background: #fff;
  }
  img { max-width: 100%; height: auto; }
  a { color: #922B21; }
</style>
</head>
<body class="artometrics-article-body">${html}</body>
</html>`;
}

export function ArticleBody({ html }: { html: string }) {
  const { width } = useWindowDimensions();
  const source = useMemo(() => ({ html: wrapHtml(html) }), [html]);

  return (
    <View style={styles.wrap}>
      <WebView
        originWhitelist={["*"]}
        source={source}
        style={{ width: width - 40, minHeight: 480, backgroundColor: "transparent" }}
        scrollEnabled={false}
        setSupportMultipleWindows={false}
        onLoadEnd={(e) => {
          e.currentTarget.injectJavaScript(FALLBACK_SCRIPT);
        }}
        // Allow sizing via content; native WebView height is approximate.
        nestedScrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%" },
});
