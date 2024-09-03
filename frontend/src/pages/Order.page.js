import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel
} from "@mui/material";
import Textarea from "../components/TextArea";
import { useNavigate, useParams } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    zipcode: 0,
    pickUpDate: Date,
    pickUpTime: Date,
    numberOfServings: 0,
    orderType: "",
    flavor: "",
    orderDetails: "",
    refPictures: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const orderTypes = [
    {
      id: 1,
      value: "Cupcakes",
    },
    {
      id: 2,
      value: "Cakes",
    },
    {
      id: 3,
      value: "Cakes & Cupcakes",
    },
  ];
  const flavors = [
    {
      id: 1,
      value: "Strawberry",
    },
    {
      id: 2,
      value: "Vanilla",
    },
    {
      id: 3,
      value: "Chocolate",
    },
    {
      id: 4,
      value: "Red Velvet",
    },
    {
      id: 5,
      value: "Carrot",
    },
    {
      id: 6,
      value: "Other (please list below in details)",
    },
  ];
  const convert24to12 = (time) => {
    // Extract hours and minutes from the time string
    const hours = parseInt(time.slice(0, 2));
    const minutes = time.slice(3, 5);

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const twelveHourTime = `${hours % 12 || 12}:${minutes} ${amOrPm}`;

    return twelveHourTime;
  };


  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        zipcode: 0,
        pickUpDate: Date,
        pickUpTime: Date,
        numberOfServings: 0,
        orderType: "",
        flavor: "",
        orderDetails: "",
        refPictures: "",
      });
      navigate("/");
    }
  }
  return (
    <div className="py-7">
      <div className="bg-white w-2/4 rounded-md flex flex-row justify-around mr-auto ml-auto pl-12">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "450px",
            margin: "auto",
            height: "100%",
            gap: "3rem",
          }}
          onSubmit={onSubmit}
        >
          <h1 className="text-2xl font-semibold py-3">
            Let's Get You Some Cake!
          </h1>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            name="firstName"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            name="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => updateForm({ phoneNumber: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          <TextField
            label="Pickup Date"
            type="date"
            variant="outlined"
            name="date"
            value={form.pickUpDate}
            onChange={(e) => updateForm({ pickUpDate: e.target.value })}
          />
          <TextField
            label="Pickup Time"
            type="time"
            variant="outlined"
            name="time"
            onChange={(e) => {
              const timeUpdate = convert24to12(e.target.value);
              updateForm({ pickUpTime: timeUpdate });
            }}
          />
          <TextField
            label="Number of Servings"
            type="text"
            variant="outlined"
            name="servings"
            value={form.numberOfServings}
            onChange={(e) => updateForm({ numberOfServings: e.target.value })}
          />
          <TextField
            label="ZipCode"
            type="number"
            variant="outlined"
            name="zipcode"
            value={form.zipcode}
            onChange={(e) => updateForm({ zipcode: e.target.value })}
          />
          <FormControl fullWidth>
            <FormLabel>Order Type</FormLabel>
            <TextField
              select
              sx={{ width: "60%" }}
              onChange={(e) =>  updateForm({ orderType:e.target.value })}
            >
              {orderTypes.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Flavor</FormLabel>
            <TextField
              select
              sx={{ width: "60%" }}
              onChange={(e) =>  updateForm({ flavor:e.target.value })}
            >
              {flavors.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl sx={{ border: "none" }}>
            <FormLabel>Order Details</FormLabel>
            <Textarea
              minRows={3}
              value={form.orderDetails}
              placeholder="Allergies, Cake Flavor, and etc."
              onChange={(e) => updateForm({ orderDetails: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Reference Photos</FormLabel>
            <Textarea
              minRows={3}
              value={form.refPictures}
              placeholder="links"
              label="Reference Photos"
              onChange={(e) => updateForm({ refPictures: e.target.value })}
            />
          </FormControl>
          <div className="py-2">
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              type="submit"
            >
              Submit Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Order;
