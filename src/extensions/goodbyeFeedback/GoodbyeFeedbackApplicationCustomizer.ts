import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GoodbyeFeedbackApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GoodbyeFeedbackApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGoodbyeFeedbackApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  Top: string;
  Bottom: string;
}

import styles from './GoodbyeFeedback.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GoodbyeFeedbackApplicationCustomizer
  extends BaseApplicationCustomizer<IGoodbyeFeedbackApplicationCustomizerProperties> {

  // These have been added
  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  private _styles: any | undefined;

  private _renderPlaceHolders(): void {

    console.log('GoodbyeFeedbackApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this.onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this.properties) {
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = ``;
          `${styles.app}`
        }
      }
    }
  }

  @override
  public onInit(): Promise<void> {
    this._styles = styles;
    Log.info(LOG_SOURCE, `Initialized ${strings.Title} ${styles}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this._renderPlaceHolders();

    return Promise.resolve();
  }
}
