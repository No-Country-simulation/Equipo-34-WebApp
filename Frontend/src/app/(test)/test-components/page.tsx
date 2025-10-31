import type { ComponentProps, ComponentType, FC } from 'react';
import CustomizableSelector from '@/shared/components/CustomizableSelector';
import FluidDropdown from '@/shared/components/FluidDropdown';

interface TestComponentProps {
  component: ComponentType<any>}

const TestComponent: FC<TestComponentProps> = ({ component: Component }) => {
  return <Component />;
};

const TestComponentsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Test Components</h1>
      <TestComponent component={CustomizableSelector} />
      <TestComponent component={FluidDropdown} />
    </div>
  );
};

export default TestComponentsPage;
