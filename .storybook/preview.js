import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

export const parameters = {
  options: {
    storySort: {
      order: [
        'AboutMe',
        ['Introduction', 'Career', 'Lecturer', 'Telecom', 'Development'],
        'Youtube05oct22',
        ['Termux'],
        'Youtube27sep22',
        ['Start','Plan', 'RunNodeJS', 'RunAngular' ],
        'Youtube15sep22',
        ['Title', 'FlowChart', 'RunAngular', 'RunStorybook', 'UpdatePR'],
        'YoutubeMaking',
        [
          'ComponentSetup',
          'Markdown',
          'Mermaid',
          'AngularNgXs',
          'EnvironmentSetup',
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