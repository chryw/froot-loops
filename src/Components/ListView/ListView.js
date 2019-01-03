import React from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
} from 'office-ui-fabric-react/lib/index';
import './ListView.css';

const ListView = (props) => {
  const { items, fieldNames } = props;
  return (
    <DetailsList
      className="ListView"
      items={items}
      selectionPreservedOnEmptyClick
      columns={fieldNames}
      layoutMode={DetailsListLayoutMode.justified}
      checkboxVisibility={CheckboxVisibility.hidden}
    />
  );
};

ListView.propTypes = {
  items: PropTypes.array.isRequired,
  fieldNames: PropTypes.array,
};

ListView.defaultProps = {
  fieldNames: ['name'],
};

export default ListView;
