
import CardSubMenu from '@components/cards/CardSubMenu';
import CodeBlock from '@components/ui/CodeBlock';
import { generateDisplayComponent } from '@lib/utils/helper';

const CardUsageProgressbar = () => {
  return (
    <CardSubMenu title="Usage">
      <p>Example usage of Progressbar:</p>
      <CodeBlock codeString={generateDisplayComponent('Progressbar', displayUsage)} />
    </CardSubMenu>
  );
}

const displayUsage = `// Usage example for Progressbar`;

export default CardUsageProgressbar;