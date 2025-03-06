import {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicLight.woff") format("woff");
      font-display: swap;
      font-weight:100;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicLight.woff") format("woff");
      font-display: swap;
      font-weight:200;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothic.woff") format("woff");
      font-display: swap;
      font-weight:300;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothic.woff") format("woff");
      font-display: swap;
      font-weight:400;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothic.woff") format("woff");
      font-display: swap;
      font-weight:500;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicBold.woff") format("woff");
      font-display: swap;
      font-weight:600;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicBold.woff") format("woff");
      font-display: swap;
      font-weight:700;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicExtraBold.woff") format("woff");
      font-display: swap;
      font-weight:800;
    }
    @font-face {
      font-family: "NanumGothic";
      src: url("/fonts/NanumGothicExtraBold.woff") format("woff");
      font-display: swap;
      font-weight:900;
    }

    html,
    body {
    max-width: 100vw;
    overflow-x: hidden;
    }

    body {
    color: var(--foreground);
    background: var(--background);
    font-family: "NanumGothic", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    }

    html, body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
      padding: 0;
      margin: 0;
      color: #545454;
    }

    body, input, select {
        font-size: 12px;
        color: #545454;
    }

    header, footer, section, article, aside, nav, hgroup, details, menu, figure, figcaption {
      display: block;
      margin: 0;
      padding: 0;
    }

    label {
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    @media (prefers-color-scheme: dark) {
    html {
        color-scheme: dark;
    }
    }
`;