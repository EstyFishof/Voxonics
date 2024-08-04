import { routes } from '@/router';

describe('routes', () => {
    it('should be array', () => {
        expect(routes.length).toBeGreaterThan(0);
    });
    it('routes snapshot', () => {
        expect(routes).toMatchSnapshot();
    });
    test.each(routes)(`should have a component %s`, (route) => {
        expect(route).toHaveProperty('path');
        expect(route).toHaveProperty('name');
        expect(route).toHaveProperty('component');
        const instance = route.component();
        expect(instance).toBeTruthy();
        expect(route.component).toBeDefined();
    });
    test.each(routes[2].children)(`should have a component children`, (child) => {
        expect(child).toHaveProperty('path');
        expect(child).toHaveProperty('name');
        expect(child).toHaveProperty('component');
        const instance = child.component();
        expect(instance).toBeTruthy();
        expect(child.component).toBeDefined();
    });
});
