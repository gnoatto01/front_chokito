import React from 'react';
import { TableCell } from "@/components/ui/table";
import { formatarData } from './formatarDatas';

interface DateCellProps {
    data: string | number | Date;
}

const DateTableCell: React.FC<DateCellProps> = ({ data }) => {
    const dataFormatada = formatarData(data);

    return (
        <TableCell>
            {dataFormatada}
        </TableCell>
    );
};

export default DateTableCell;
