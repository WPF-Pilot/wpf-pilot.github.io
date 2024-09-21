/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: ['tutorial', 'custom-elements', 'deep-dive', {
        type: 'link',
        label: 'CI/CD GitHub Action',
        href: 'https://github.com/WPF-Pilot/PaymentCalculator/blob/main/.github/workflows/ui-tests.yml',
    }],
    apiSidebar: ['api/app-driver', 'api/element', 'api/primitive', 'api/keyboard'],
};

module.exports = sidebars;
