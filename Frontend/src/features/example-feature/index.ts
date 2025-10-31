/**
 * Example Feature - Index
 *
 * Exporta el contenedor como punto de entrada principal de la feature.
 */

export { ExampleContainer } from './ExampleContainer';
export { ExampleUI } from './components/ExampleUI';
export { useExampleUseCase } from './use-cases/example.use-case';
export { exampleService } from './services/example.service';
export { ExampleAdapter } from './adapters/example.adapter';
export * from './domain/types';
