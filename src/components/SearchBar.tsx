import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

interface SearchBarProps {
    onSearch: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <Input
            placeholder="Search recipes..."
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            size="large"
            style={{ maxWidth: 400 }}
        />
    )
}