import { ModuleWithProviders, Type } from '@angular/core';
import { BaseFacade } from '../interfaces/base.interfaces';
import { FacadeTestingUtils } from './facade-testing.utils';

/**
 * @class StorybookTestingUtils
 * @description Utilities per l'integrazione con Storybook
 * Fornisce metodi per configurare storie con mock facade
 */
export class StorybookTestingUtils {
  /**
   * Crea i providers per una storia con mock facade
   */
  static createProvidersWithMockFacade<T extends { id: string }>(
    facadeType: Type<BaseFacade<T>>,
    mockData: T[]
  ): ModuleWithProviders<any>[] {
    return [
      {
        ngModule: undefined,
        providers: [
          {
            provide: facadeType,
            useValue: FacadeTestingUtils.createMockFacade(mockData)
          }
        ]
      }
    ];
  }

  /**
   * Crea i providers per una storia con mock facade dinamico
   */
  static createProvidersWithDynamicMockFacade<T extends { id: string }>(
    facadeType: Type<BaseFacade<T>>,
    mockData: T[],
    options: {
      simulateDelay?: number;
      simulateErrors?: boolean;
    } = {}
  ): ModuleWithProviders<any>[] {
    return [
      {
        ngModule: undefined,
        providers: [
          {
            provide: facadeType,
            useValue: FacadeTestingUtils.createDynamicMockFacade(mockData, options)
          }
        ]
      }
    ];
  }

  /**
   * Crea un template di storia base
   */
  static createBaseStory<T>(
    component: Type<any>,
    props: Partial<T> = {}
  ) {
    return {
      component,
      props
    };
  }
}
