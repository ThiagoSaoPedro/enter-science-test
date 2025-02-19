<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'event/store', 'event/list'], // Adicione 'event/list' aqui
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Permita apenas o front-end React
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Se estiver usando autenticação com cookies ou tokens
];