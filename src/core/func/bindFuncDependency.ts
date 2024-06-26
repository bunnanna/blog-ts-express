import { Container } from 'inversify';

export default function bindFuncDependency(func: Function, container: Container, ...dependencies: any[]) {
	const injections = dependencies.map((dependency) => container.resolve(dependency));
	return func.bind(func, ...injections);
}
