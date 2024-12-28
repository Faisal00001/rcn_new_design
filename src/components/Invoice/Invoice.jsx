import { useEffect, useRef, useState } from "react";
import "./invoice.css"
import { v4 as uuidv4 } from "uuid"
import ReactToPrint from "react-to-print";
const Invoice = () => {

    const [showInvoice, setshowInvoice] = useState(false)
    const [name, setName] = useState("Faisal Osman")
    const [address, setAddress] = useState("Dhaka, Bangladesh")
    const [email, setEmail] = useState("faisalosman798@gmail.com")
    const [phone, setPhone] = useState("01790-203616")
    const [bankName, setBankName] = useState("Bank Asia")
    const [bankAccount, setBankAccount] = useState("123 456 7989")
    const [website, setWebsite] = useState("https://google.com")
    const [clientName, setClientName] = useState("Rakib Khan")
    const [clientAddress, setClientAddress] = useState("Dhaka, Bangladesh")
    const [invoiceNumber, setInvoiceNumber] = useState("1004")
    const [invoiceDate, setInvoiceDate] = useState("20/10/24")
    const [dueDate, setDueDate] = useState("20/11/24")
    const [notes, setNotes] = useState("Pay to the bank account indicated above")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [total, setTotal] = useState(0)
    const componentRef = useRef();
    useEffect(() => {
        const calculateAmount = () => {
            setAmount(quantity * price)
        }
        calculateAmount()
        const totalAmount = list.reduce((acc, curr) => {
            const amount = parseFloat(curr.amount)
            return acc + ((isNaN(amount)) ? 0 : amount)
        }, 0)
        setTotal(totalAmount)
    }, [price, quantity, list])
    const handlePrint = () => {
        window.print()
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const newItems = {
            id: uuidv4(),
            description: description,
            quantity: quantity,
            price: price,
            amount: amount
        }
        console.log(newItems)
        setDescription("")
        setQuantity("")
        setPrice("")
        setAmount("")
        setList([...list, newItems])
        setIsEdit(false)
    }
    const handleEdit = (id) => {
        const editingRow = list.find(row => row.id === id)
        setList(list.filter(row => row.id !== id))
        setIsEdit(true)
        setDescription(editingRow.description)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)
        setAmount(editingRow.amount)
    }
    const handleDelete = (id) => {
        setList(list.filter(row => row.id !== id))
    }
    // const handleClick = () => {
    //     const email = 'recipient@example.com';
    //     const subject = 'Your Subject';
    //     const body = 'Your email body text here.';
    //     window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    //   };

    return (
        <div className="p-5">
            <main className="p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  shadow-xl rounded bg-white">
                <ReactToPrint trigger={() => <button className={`bg-blue-700 ${!showInvoice ? 'hidden' : 'visiable'}  text-white font-medium py-2.5 px-8 shadow border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 transition-all duration-300 select-none text-sm rounded-lg`}>Print / Download</button>} content={() => componentRef.current}></ReactToPrint>
                {
                    showInvoice ?
                        <><div className="p-5" ref={componentRef}>
                            <header className="flex flex-col justify-center items-center mb-5 xl:flex-row xl:justify-between">
                                <div>
                                    <h2 className="font-bold uppercase tracking-wide text-4xl mb-3">Invoice</h2>
                                </div>
                                <div>

                                </div>
                            </header>
                            {/* Your Details */}
                            <section className="flex flex-col  items-end justify-end">
                                {/* <input type="text" placeholder="Enter your name" required /> */}
                                <h2 className="text-xl font-bold uppercase md:text-4xl">{name}</h2>
                                <p>{address}</p>
                            </section>
                            {/* End of your details */}
                            {/* Clinet Details */}
                            <section className="mt-5">
                                <h2 className="text-xl uppercase">{clientName}</h2>
                                <p>{clientAddress}</p>
                            </section>
                            {/* End of client details */}
                            {/* Dates */}
                            <article className="my-5 flex justify-end items-end">
                                <ul>
                                    <li className="p-1"><span className="font-bold">Invoice Number:</span>{invoiceNumber} </li>
                                    <li className="p-1 bg-gray-100"><span className="font-bold">Invoice Date:</span>{invoiceDate} </li>
                                    <li className="p-1"><span className="font-bold">Due Date:</span>{dueDate} </li>
                                </ul>
                            </article>
                            {/* End of dates */}
                            {/* Table */}
                            <div className="my-5">
                                <div className="overflow-x-auto">
                                    <table className="table table-xs">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th></th>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Amount</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list.map((item, index) =>

                                                    <tr key={item.id}>
                                                        <th>{index + 1}</th>
                                                        <td className="max-w-[150px] text-justify">{item.description}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.amount}</td>
                                                    </tr>

                                                )
                                            }


                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th className="text-black"><span className="font-bold text-black ">Total Amount : </span>{total.toLocaleString()} BDT</th>


                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            {/* End of the table */}
                            {/* Notes */}
                            <section className="mb-5">
                                <p className="lg:w-1/2 text-justify">{notes}</p>
                            </section>
                            {/* End of the notes */}
                            {/* Footer */}
                            <footer className="invoiceFooter border-t-2 border-gray-300 pt-5">
                                <ul className="flex flex-wrap items-center justify-center">
                                    <li><span className="font-bold">Your name:</span> {name}</li>
                                    <li><span className="font-bold">Your email:</span> {email}</li>
                                    <li><span className="font-bold">Phone number:</span> {phone}</li>
                                    <li><span className="font-bold">Bank:</span> {bankName}</li>
                                    <li><span className="font-bold">Account holder:</span> {name}</li>
                                    <li><span className="font-bold">Account number:</span> {bankAccount}</li>
                                    <li><span className="font-bold">Website:</span> <a href={website} target="_blank" rel="nopenner noreferrer">{website}</a></li>
                                </ul>
                            </footer>
                            {/* End of the Footer */}

                        </div>  <div className="mt-5">
                                <button onClick={() => setshowInvoice(false)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white ">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Edit Information
                                    </span>
                                </button>
                            </div></> : <>
                            <div className="flex flex-col justify-center">


                                <article className="md:grid grid-cols-2 gap-x-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">Your full name</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-8" type="text" name="name" id="name" placeholder="Enter your name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="address">Enter your address</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="address" id="address" placeholder="Enter your address" autoComplete="off" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                </article>
                                <article className="md:grid grid-cols-3 gap-x-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">Enter your email</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="email" id="email" placeholder="Enter your email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="website">Enter your website</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="url" name="website" id="website" placeholder="Enter your website" autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="phone">Enter your phone</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="phone" id="phone" placeholder="Enter your phone" autoComplete="off" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                </article>
                                <article className="md:grid grid-cols-2 gap-x-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="bankName">Enter your bank name</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="bankName" id="bankName" placeholder="Enter your bank name" autoComplete="off" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="bankAccount">Enter your bank account number</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="bankAccount" id="bankAccount" placeholder="Enter your bank account number" autoComplete="off" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
                                    </div>
                                </article>
                                <article className="md:grid grid-cols-2 gap-x-5 md:mt-16">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="clientName">{"Enter your client's name"}</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="clientName" id="clientName" placeholder="Enter your client's name" autoComplete="off" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="clientAddress">{"Enter your client's address"}</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="clientAddress" id="clientAddress" placeholder="Enter your client's address" autoComplete="off" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
                                    </div>
                                </article>

                                <article className="md:grid grid-cols-3 gap-x-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="invoiceNumber">{"Invoice Number"}</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="invoiceNumber" id="invoiceNumber" placeholder="Invoice number" autoComplete="off" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="invoiceDate">{"Invoice Date"}</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="date" name="invoiceDate" id="invoiceDate" placeholder="Invoice Date" autoComplete="off" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="dueDate">{"Due Date"}</label>
                                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="date" name="dueDate" id="dueDate" placeholder="Due Date" autoComplete="off" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                    </div>
                                </article>
                                {/* Table */}
                                <form onSubmit={handleSubmit} className="md:mt-16">
                                    <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="description">{"Item Description"}</label>
                                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="text" name="description" required id="description" placeholder="Item Description" autoComplete="off" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <div className="md:grid grid-cols-3 gap-x-5">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="quantity">{"Quantity"}</label>
                                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="number"
                                                required
                                                name="quantity" id="quantity" placeholder="Quantity" autoComplete="off" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="price">{"Price"}</label>
                                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5" type="number" required name="price" id="price" placeholder="Price" autoComplete="off" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="amount">{"Amount"}</label>
                                            <input readOnly className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5 read-only" type="text" name="amount" id="amount" placeholder="Amount" autoComplete="off" value={amount} />

                                        </div>
                                    </div>
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                        {
                                            isEdit ? "Editing row item" : "Add table item"
                                        }
                                    </button>
                                </form>
                                {/* Table end */}
                                {/* Table Output and edit */}
                                <div className="my-5">
                                    <div className="overflow-x-auto">
                                        <table className="table table-xs">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th></th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Amount</th>
                                                    <tr>Actions</tr>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list.map((item, index) =>

                                                        <tr key={item.id}>
                                                            <th>{index + 1}</th>
                                                            <td className="max-w-[150px] text-justify">{item.description}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.amount}</td>
                                                            <td>
                                                                <div className="flex gap-x-3">
                                                                    <button onClick={() => handleEdit(item.id)} className="bg-green-500 text-white px-4 py-2 rounded-md">Edit</button>
                                                                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                                                                </div>

                                                            </td>
                                                        </tr>

                                                    )
                                                }


                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th><span className="font-bold text-black ">Total Amount : </span>{total.toLocaleString()} BDT</th>


                                                </tr>
                                            </tfoot>

                                        </table>
                                    </div>
                                </div>
                                {/* End of table output and edit */}
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="notes">{"Additional notes"}</label>
                                <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-5" name="notes" id="notes" cols={"30"} rows={"10"} placeholder="Additional notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                                <div>
                                    <button onClick={() => setshowInvoice(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Preview Invoice
                                        </span>
                                    </button>
                                </div>

                            </div>
                        </>
                }
            </main>
        </div>
    );
};

export default Invoice;