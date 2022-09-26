import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  options: {
    storySort: {
      order: [
        'AboutMe',
        ['Introduction', 'Career', 'Lecturer', 'Telecom', 'Development'],
        'Youtube15sep22',
        ['Title', 'FlowChart', 'RunAngular', 'RunStorybook', 'UpdatePR'],
        'YoutubeMaking',
        [
          'AngularCompSetup',
          'Markdown',
          'Mermaid',
          'AngularNgXs',
          'AngularEnvSetup',
          'StorybookDesign',
        ],
      ],
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}