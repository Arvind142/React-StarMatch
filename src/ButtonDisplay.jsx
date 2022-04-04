// display Button
const ButtonDisplay = (props) => (
    <button className="number"
        onClick={
            () => {
                // console.log(props.number);
                props.onClick(props.number, props.status);
            }
        }
        style={{ backgroundColor: colors[props.status] }}
    >{props.number}</button>
)


// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};
export default ButtonDisplay;