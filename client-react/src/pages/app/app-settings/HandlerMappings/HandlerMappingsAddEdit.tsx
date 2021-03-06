import { TextField } from 'office-ui-fabric-react/lib/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ActionBar from '../../../../components/ActionBar';
import { HandlerMapping } from '../../../../models/WebAppModels';
import { formElementStyle } from '../AppSettings.styles';

export interface HandlerMappingAddEditProps {
  updateHandlerMapping: (item: HandlerMapping) => any;
  closeBlade: () => void;
  handlerMapping: HandlerMapping;
}

const HandlerMappingsAddEdit: React.SFC<HandlerMappingAddEditProps> = props => {
  const { updateHandlerMapping, closeBlade, handlerMapping } = props;
  const { t } = useTranslation();
  const [currentHandlerMapping, setCurrentHandlerMapping] = useState(handlerMapping);

  const updateHandlerMappingExtension = (e: any, extension: string) => {
    setCurrentHandlerMapping({ ...currentHandlerMapping, extension });
  };

  const updateHandlerMappingScriptProccessor = (e: any, scriptProcessor: string) => {
    setCurrentHandlerMapping({ ...currentHandlerMapping, scriptProcessor });
  };

  const updateHandlerMappingArguments = (e: any, argumentsVal: string) => {
    setCurrentHandlerMapping({
      ...currentHandlerMapping,
      arguments: argumentsVal,
    });
  };

  const save = () => {
    updateHandlerMapping(currentHandlerMapping);
  };

  const cancel = () => {
    closeBlade();
  };

  const actionBarPrimaryButtonProps = {
    id: 'save',
    title: t('update'),
    onClick: save,
    disable: false,
  };

  const actionBarSecondaryButtonProps = {
    id: 'cancel',
    title: t('cancel'),
    onClick: cancel,
    disable: false,
  };

  return (
    <form>
      <TextField
        label={t('extension')}
        id="handler-mappings-table-extension"
        value={currentHandlerMapping.extension}
        onChange={updateHandlerMappingExtension}
        styles={{
          root: formElementStyle,
        }}
        autoFocus
      />
      <TextField
        label={t('scriptProcessor')}
        id="handler-mappings-table-script-processor"
        value={currentHandlerMapping.scriptProcessor}
        onChange={updateHandlerMappingScriptProccessor}
        styles={{
          root: formElementStyle,
        }}
      />
      <TextField
        label={t('argumentsRes')}
        id="handler-mappings-table-arguments"
        value={currentHandlerMapping.arguments}
        onChange={updateHandlerMappingArguments}
        styles={{
          root: formElementStyle,
        }}
      />
      <ActionBar
        id="handler-mappings-edit-footer"
        primaryButton={actionBarPrimaryButtonProps}
        secondaryButton={actionBarSecondaryButtonProps}
      />
    </form>
  );
};
export default HandlerMappingsAddEdit;
