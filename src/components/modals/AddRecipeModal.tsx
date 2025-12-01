import { Modal, Input, Button, Typography, App, Form } from 'antd'
import { useState } from 'react'
import type { CreateRecipeDto, RecipeDetailsData } from '@/models/Recipe'
import {
    postRecipe,
} from '@/api/recipes'
import { useAuthStore } from '@/context/AuthContext'
import { notifyError } from '@/utils/notifications'
import { LoadingSpinner } from '../LoadingSpinner'
import { css } from '@emotion/css'
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"

const { Title } = Typography;

const titleText = css`
    margin-top: 4px;
    margin-bottom: 16px !important;
    flex: 1;
`

export interface RecipeCreateFormValues {
    title: string
    imageUrl: string
    tags: string[]
    description?: string
    ingredients: string[]
    steps: string[]
}

interface AddRecipeModalProps {
    open: boolean
    onClose: () => void
    onSuccessfulRecipeCreation: (recipe: RecipeDetailsData) => void
}

const formValuesToCreateDto = (values: RecipeCreateFormValues): CreateRecipeDto => ({
    title: values.title,
    imageUrl: values.imageUrl,
    tags: values.tags.map(x => x.trim()),
    description: values.description,
    ingredients: values.ingredients,
    steps: values.steps
})

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ open, onClose, onSuccessfulRecipeCreation }) => {
    const [loading, setLoadingAdd] = useState(false)
    const { notification: notificationInstance } = App.useApp()
    const [form] = Form.useForm<RecipeCreateFormValues>()
    const { isAuthenticated, jwt } = useAuthStore()

    const handleFinish = async (values: RecipeCreateFormValues) => {
        try {
            setLoadingAdd(true)
            if (isAuthenticated) {
                const newRecipe = await postRecipe(jwt!, formValuesToCreateDto(values))
                form.resetFields()
                onSuccessfulRecipeCreation(newRecipe)
            } else {
                throw 'not authenticated'
            }
        } catch (err) {
            console.error(err)
            notifyError(
                notificationInstance,
                'Error creating recipe',
                'Please try again later'
            )
        } finally {
            setLoadingAdd(false)
        }
    }

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    ingredients: [''],
                    steps: [''],
                    tags: [],
                    imageUrl: 'https://picsum.photos/id/431/600/480'
                }}
            >
                <Title className={titleText} level={3}>
                    New Recipe
                </Title>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter a title" }]}
                >
                    <Input placeholder="e.g. Arroz con Pollo" />
                </Form.Item>

                <Form.Item
                    label="Image URL"
                    name="imageUrl"
                    rules={[{ required: true, message: "Please enter an image URL" }]}
                >
                    <Input placeholder="https://..."></Input>
                </Form.Item>

                <Form.Item
                    label="Tags (comma separated)"
                    name="tags"
                    getValueFromEvent={(e) => e.target.value.split(",")}
                >
                    <Input placeholder="Peruvian, chicken, rice" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={3} placeholder="Short description..." />
                </Form.Item>

                <Form.Item label="Ingredients">
                    <Form.List name="ingredients">
                        {(fields, { add, remove }) => (
                            <div>
                                {fields.map((field) => (
                                    <div key={field.key} style={{ display: 'flex', alignItems: 'baseline', width: '60%' }}>
                                        <Form.Item
                                            {...field}
                                            rules={[{ required: true, message: "Ingredient required" }]}
                                            style={{ marginBottom: 12, marginRight: 12, width: '100%' }}
                                        >
                                            <Input placeholder="1 cup of rice" />
                                        </Form.Item>
                                        {
                                            fields.length > 1 && (
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            )
                                        }
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add Ingredient
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item label="Steps">
                    <Form.List name="steps">
                        {(fields, { add, remove }) => (
                            <div>
                                {fields.map((field) => (
                                    <div key={field.key} style={{ display: 'flex', alignItems: 'baseline', width: '80%' }}>
                                        <Form.Item
                                            {...field}
                                            style={{ marginBottom: 12, marginRight: 12, width: '100%' }}
                                            rules={[{ required: true, message: "Step required" }]}
                                        >
                                            <Input.TextArea
                                                placeholder="Describe the step..."
                                                autoSize={{ minRows: 2, maxRows: 5 }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 && (
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        )}
                                    </div>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Step
                                    </Button>
                                </Form.Item>
                            </div>
                        )}
                    </Form.List>

                </Form.Item>

                {loading ? <LoadingSpinner /> :
                    <Button type="primary" htmlType="submit" block>
                        Create Recipe
                    </Button>
                }
            </Form>

        </Modal>
    )
}
