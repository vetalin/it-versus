import React from "react";
import { render } from "@testing-library/react";
import { Canvas } from "./Canvas";
import { getTank, Tank } from "./model/tank";


describe('Отрисовка канваса', () => {
    const thenCheckPosition = (tank: Tank, x: number, y: number) => {
        expect(tank.position.x).toBe(x);
        expect(tank.position.y).toBe(y);
    }

    const whenPushKey = (key: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown') => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key }));
    }

    beforeEach(() => {
        render(<Canvas />);
    });

    it('На странице есть холст', async () => {
        const canvas = await document.querySelector('canvas');
        expect(canvas).toBeTruthy();
    });

    it('Холст имеет размеры 800x500', async () => {
        const canvas = await document.querySelector('canvas');
        expect(canvas).toHaveStyle('width: 800px');
        expect(canvas).toHaveStyle('height: 500px');
    });

    it('На холсте есть танк', async () => {
        const tank = await getTank();
        expect(tank).toBeTruthy();
    });

    it('У танка есть текстура', async () => {
        const tank = await getTank();
        expect(tank.image).toBeTruthy();
    });

    it('Танк имеет размеры 50x50', async () => {
        const tank = await getTank();
        expect(tank.size.width).toBe(50);
        expect(tank.size.height).toBe(50);
    });

    it('Танк имеет координаты 10x10', async () => {
        const tank = await getTank();
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(10);
    });

    it('Когда я нажимаю клавиши на клавиатуре (влево вправо вверх вниз, то танк двигается)', async () => {
        const tank = await getTank();
        tank.initKeyboardListener();

        thenCheckPosition(tank, 10, 10);

        whenPushKey('ArrowLeft');
        thenCheckPosition(tank, 0, 10);

        whenPushKey('ArrowDown');
        thenCheckPosition(tank, 0, 20);

        whenPushKey('ArrowRight');
        thenCheckPosition(tank, 10, 20);

        whenPushKey('ArrowUp');
        thenCheckPosition(tank, 10, 10);
    });


    it('Танк должен двигаться влево, если я нажимаю левую кнопку', async () => {
        const tank = await getTank();
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(10);
        tank.moveLeft(tank.position, 10);
        expect(tank.position.x).toBe(0);
        expect(tank.position.y).toBe(10);
    });

    it('Танк должен двигаться вправо, если я нажимаю вправо кнопку', async () => {
        const tank = await getTank();
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(10);
        tank.moveRight(tank.position, 10);
        expect(tank.position.x).toBe(20);
        expect(tank.position.y).toBe(10);
    });

    it('Танк должен двигаться вверх, если я нажимаю кнопку вверх', async () => {
        const tank = await getTank();
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(10);
        tank.moveUp(tank.position, 10);
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(0);
    });

    it('Танк должен двигаться вниз, если я нажимаю кнопку вниз', async () => {
        const tank = await getTank();
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(10);
        tank.moveDown(tank.position, 10);
        expect(tank.position.x).toBe(10);
        expect(tank.position.y).toBe(20);
    });

    it('Танк не должен выходить за пределы области влево и вверх', async () => {
        const tank = await getTank();
        tank.initKeyboardListener();
        thenCheckPosition(tank, 10, 10);
        whenPushKey('ArrowLeft');
        thenCheckPosition(tank, 0, 10);
        whenPushKey('ArrowLeft')
        thenCheckPosition(tank, 0, 10);
        whenPushKey('ArrowUp')
        whenPushKey('ArrowUp')
        thenCheckPosition(tank, 0, 0);
    })
    
});

export {};
