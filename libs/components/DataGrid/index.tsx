import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import { TypeDataGridProps } from '@inovua/reactdatagrid-enterprise/types';
import React from 'react'

const DataGrid = ({ columns, dataSource, style, idProperty = 'id', ...rest }: TypeDataGridProps | any) => {
    return <ReactDataGrid
        idProperty="id"
        showCellBorders={'horizontal'}
        // onSelectionChange={onSelectionChange}
        // checkboxColumn
        showZebraRows={false}
        style={{ height: '100%', ...style }}
        columns={columns}
        theme="pink-light"
        dataSource={dataSource}
        {...rest}
    />
}

export default DataGrid;