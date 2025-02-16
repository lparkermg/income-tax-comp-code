function InputCardItem({onChange, title, forLabel, display, prefix, defaultValue}){
    return (
        <div className="card-item" title={title}>
            <label htmlFor={forLabel}>{display}</label>
            <div className="input-control">
              <span>{prefix}</span>
              <input type="number" name={forLabel} min="0" defaultValue={defaultValue} onChange={(e) => onChange(Number(e.target.value))}/>
            </div>
          </div>
    )
}

export default InputCardItem;