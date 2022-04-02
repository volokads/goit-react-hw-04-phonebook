function ContactsLiElem({ id, name, number, onClick }) {
    return (
        <li id={id} key={id}>
            <span>{name}: {number}</span>
            <button className="Btn" type="button" onClick={onClick}>Delete</button>
    </li>
)
}
export default ContactsLiElem