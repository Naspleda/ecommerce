from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category, Product, Order, OrderItem
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, UserSerializer
from django.contrib.auth.models import User

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny] # Ajusta permisos según necesidad (IsAdminUser para CRUD)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny] # Ajusta permisos

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated] # Solo usuarios autenticados pueden ver/crear órdenes

    def get_queryset(self):
        # Permite a los usuarios ver solo sus propias órdenes
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Asigna el usuario actual a la orden
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def process_payment(self, request, pk=None):
        # Lógica para integrar con Mercado Pago
        # Esto es un placeholder, necesitarías la lógica real aquí
        order = self.get_object()
        # Ejemplo: Llamar a la API de Mercado Pago, generar la preferencia de pago
        # y devolver la URL de redirección
        # from mercadopago import SDK
        # sdk = SDK("YOUR_MERCADOPAGO_ACCESS_TOKEN")
        # preference_data = {
        #     "items": [
        #         {
        #             "title": item.product.name,
        #             "quantity": item.quantity,
        #             "unit_price": float(item.price)
        #         } for item in order.items.all()
        #     ],
        #     "back_urls": {
        #         "success": "http://localhost:3000/payment/success",
        #         "pending": "http://localhost:3000/payment/pending",
        #         "failure": "http://localhost:3000/payment/failure",
        #     },
        #     "auto_return": "approved",
        #     "external_reference": str(order.id)
        # }
        # preference_response = sdk.preference().create(preference_data)
        # preference = preference_response["response"]
        # return Response({"init_point": preference["init_point"]})
        return Response({"message": "Mercado Pago integration pending"}, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # Permitir registro
    http_method_names = ['post'] # Solo permitir POST para registro

    # Puedes añadir un endpoint para obtener el perfil del usuario autenticado
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)