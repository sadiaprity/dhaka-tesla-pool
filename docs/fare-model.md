BASE_FARE_PAISA = 3000
DISTANCE_RATE_PAISA_PER_100M = 50
POOL_DISCOUNT_PERCENT = 15
Rounding rule: nearest integer paisa, standard half-up rounding.

distanceCharge = ceil(distanceMeters / 100) × 50

Nusrat: Banani → Mohakhali, 4200m
  distanceCharge = 42 × 50 = 2100
  solo   = 3000 + 2100 = 5100 paisa
  pooled = round(5100 × 0.85) = 4335 paisa

Rafiq: Banani → Gulshan 1, 3100m
  distanceCharge = 31 × 50 = 1550
  solo   = 3000 + 1550 = 4550 paisa
  pooled = round(4550 × 0.85) = 3868 paisa