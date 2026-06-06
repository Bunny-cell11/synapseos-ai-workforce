import stripe

stripe.api_key = "STRIPE_SECRET"

def create_checkout():

    session = stripe.checkout.Session.create(

        payment_method_types=["card"],

        line_items=[{

            "price_data": {

                "currency": "usd",

                "product_data": {
                    "name": "SynapseOS Pro"
                },

                "unit_amount": 4900
            },

            "quantity": 1
        }],

        mode="subscription",

        success_url="http://localhost:3000",

        cancel_url="http://localhost:3000"
    )

    return session.url