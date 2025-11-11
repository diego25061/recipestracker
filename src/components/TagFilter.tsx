import { Select } from 'antd'

const { Option } = Select

interface TagFilterProps {
    tags: string[]
    selected: string[]
    onChange: (tags: string[]) => void
}

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selected, onChange }) => (
    <Select
        mode="multiple"
        allowClear
        placeholder="Filter by tags"
        value={selected}
        onChange={onChange}
        style={{ minWidth: 200 }}
    >
        {tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
)
