import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
  }, [])

  function loadToy() {
    if (!toyId) return
    toyService
      .getById(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        console.log("Had issues in toy edit:", err)
        navigate("/toy")
        showErrorMsg("Toy not found!")
      })
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target
    let fieldValue = value
    if (type === "checkbox") {
      fieldValue = checked
    } else if (type === "number") {
      fieldValue = +value
    } else if (type === "select-multiple") {
      fieldValue = [...target.selectedOptions].map((option) => option.value)
    }

    setToyToEdit((prevToy) => ({
      ...prevToy,
      [name]: fieldValue
    }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then((savedToy) => {
        showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
        navigate("/toy")
      })
      .catch((err) => {
        showErrorMsg("Cannot save toy")
      })
  }

  const priceValidations = {
    min: "1",
    required: true
  }

  return (
    <section className='toy-edit'>
      <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>
      <form onSubmit={onSaveToy}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={toyToEdit.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            id='price'
            name='price'
            value={toyToEdit.price || ""}
            {...priceValidations}
            min='1'
            required
            onChange={handleChange}
          />
        </div>

        {toyToEdit._id && (
          <div className='form-group'>
            <label>
              <input
                type='checkbox'
                name='inStock'
                checked={toyToEdit.inStock}
                onChange={handleChange}
              />
              In Stock
            </label>
          </div>
        )}

        <button>{toyToEdit._id ? "Update Toy" : "Add"}</button>
      </form>
    </section>
  )
}
