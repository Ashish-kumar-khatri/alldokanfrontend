import React from 'react'
import {
    Select,
    Textarea,
    TextInput
} from '@mantine/core';
import { Icon } from '@iconify/react';

const categories  = [
    "Apparels & Accessories",
    "Automobiles",
    "Beauty & Health",
    "Books & Learning",
    "Bushiness & Industrials",
    "Computer & Peripherals",
    "Electronic,Tvs, & More",
    "Events & Happenings",
    "Mobile Phones & Accessories",
    "Music Instruments",
    "Pets & Pet Care",
    "Real Estate",
    "Services",
    "Sports & Fitness",
    "Toys & Video Games",
]

const conditions = [
    'brand new',
    'like new',
    'used',
    'not working'
]

function Product({
    changeHandler,
    data
}) {
  return (
    <>
        <Select
            label="catgory of your product"
            placeholder="Pick one"
            data={categories.map(category => ({
                value : category,
                label : category
            }))}
            searchable
            size = "md"
            rightSection = {<Icon icon = "tabler:chevron-down" />}
            required
            onChange = {(value) => changeHandler({
                name : "category",
                value : value
            })}
            value = {data.category}
        />
        <Select
            label="condition"
            placeholder="Pick one"
            data={conditions.map(cond => ({
                value : cond,
                label : cond
            }))}
            size = "md"
            rightSection = {<Icon icon = "tabler:chevron-down" />}
            required
            onChange = {(value) => changeHandler({
                name : "condition",
                value : value
            })}
            value = {data.condition}
        />
        <Textarea
            name = "note"
            label = "description"
            placeholder="Description of your product"
            withAsterisk
            autosize
            size = "md"
            minRows={4}
            onChange = {(e) => {
                changeHandler({
                    name : "note",
                    value : e.target.value
                })
            }}
            value = {data.note}
        />
        <TextInput 
            name = "tags"
            label = "Tags"
            placeholder = "laptop,fun..."
            size = "md"
            value = {data?.tags}
            onChange = {(e) => {
                changeHandler({
                    name : "tags",
                    value : e.target.value
                })
            }}
        />
    </>
  )
}

export default Product