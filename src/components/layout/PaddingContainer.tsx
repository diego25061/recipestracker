
export const PaddingContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: 24 }}>
        <div className='responsive-width-larger'>
            {children}
        </div>
    </div>
}