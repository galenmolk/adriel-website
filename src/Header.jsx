export default function Header( { content, size } ) {
    return (
        <div>
            <p style={{ fontSize: size }}>{content}</p>
        </div>
    );
}
