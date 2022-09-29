import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import { TypeDataGridProps } from '@inovua/reactdatagrid-enterprise/types';
import React from 'react'

const DataGrid = ({ columns, dataSource, onSelectionChange, idProperty = 'id', ...rest }: TypeDataGridProps | any) => {

    return <ReactDataGrid
        idProperty="id"
        showZebraRows={false}
        showCellBorders={'horizontal'}
        onSelectionChange={onSelectionChange}
        checkboxColumn
        style={{ height: '100%' }}

        columns={columns}
        theme="pink-light"
        dataSource={dataSource}
        enableSelection={true}
        licenseKey={'LSKFAN-SAFAS_K'}
        {...rest}
    />
}

export default React.memo(DataGrid);