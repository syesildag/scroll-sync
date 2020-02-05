/// <reference path="./functions.ts"/>

/**
 * @author Serkan YESILDAG
 */
namespace GenericFactory {
  'use strict';

  export interface ToString {
    toString(): string;
  }

  export interface Constructor<K, T extends Functions.Supplier<K>, A = any> {
    new(...args: Array<A>): T;
  }

  export class Base<K extends ToString, T extends Functions.Supplier<K>, A = any> {
    private readonly classMap: { [index: string]: Constructor<K, T> };

    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    public constructor(...classList: Array<Constructor<K, T>>) {
      this.classMap = {};
      for (let clazz of classList) {
        let key: K = new clazz().supply();
        this.classMap[key.toString()] = clazz;
      }
    }

    public create(key: K, ...args: Array<A>): T {
      let clazz = this.classMap[key.toString()];
      // noinspection EqualityComparisonWithCoercionJS
      return clazz == null ? null : new clazz(...args);
    }
  }
}
