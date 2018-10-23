import * as React from 'react';
import DotNetStack from './Stacks/DotNetStack';
import PhpStack from './Stacks/PhpStack';
import PythonStack from './Stacks/PythonStack';
import { AppSettingsFormValues } from '../AppSettings.Types';
import JavaStack from './Stacks/JavaStack';
import { Field, FormikProps } from 'formik';
import Dropdown from '../../../../components/form-controls/DropDown';
import { translate, InjectedTranslateProps } from 'react-i18next';
interface StacksState {
  currentStack: string;
}
class Stacks extends React.Component<FormikProps<AppSettingsFormValues> & InjectedTranslateProps, StacksState> {
  constructor(props) {
    super(props);
    this.state = {
      currentStack: 'dotnet',
    };
  }
  public render() {
    const { t } = this.props;
    return (
      <>
        <Field
          name="currentlySelectedStack"
          component={Dropdown}
          options={[
            {
              key: 'dotnet',
              text: '.NET',
            },
            {
              key: 'php',
              text: 'PHP',
            },
            {
              key: 'python',
              text: 'Python',
            },
            {
              key: 'java',
              text: 'Java',
            },
          ]}
          label={t('stack')}
          id="app-settings-stack-dropdown"
        />
        {this.props.values.currentlySelectedStack === 'dotnet' ? <DotNetStack {...this.props} /> : null}
        {this.props.values.currentlySelectedStack === 'php' ? <PhpStack {...this.props} /> : null}
        {this.props.values.currentlySelectedStack === 'python' ? <PythonStack {...this.props} /> : null}
        {this.props.values.currentlySelectedStack === 'java' ? <JavaStack {...this.props} /> : null}
      </>
    );
  }
}

export default translate()(Stacks);
