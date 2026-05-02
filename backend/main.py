from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.supabase import supabase
import stripe

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Nuxt frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stripe API Key (Test Key)
stripe.api_key = "sk_test_51H...your_secret_key_here"

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + Supabase"}

@app.post("/create-checkout-session")
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": "Example Product",
                        },
                        "unit_amount": 2000,
                    },
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )
        return {"sessionId": session.id}
    except Exception as e:
        return {"error": str(e)}
