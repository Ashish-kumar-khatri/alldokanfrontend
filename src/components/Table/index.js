import React from 'react'
import {Checkbox, ScrollArea, Table as MantineTable} from '@mantine/core';
import './style.css';

function Table({
    headings,
    rows
}) {

    return (
        <div className = "table">
            <ScrollArea>
                <MantineTable>
                    <thead>
                        <tr>
                            {
                                headings?.map(heading => (
                                    heading == "checkbox" ?
                                        <th
                                            key = {heading}
                                            className = "checkbox"
                                        >
                                            <Checkbox />
                                        </th>:
                                        <th
                                            key = {heading}
                                        >{heading}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </MantineTable>
            </ScrollArea>
        </div>
    )
}

export default Table