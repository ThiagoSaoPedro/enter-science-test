<?php
namespace App\Http\Controllers;

use App\Models\Evento; // Certifique-se de que o modelo Evento existe
use Illuminate\Http\Request;

class EventoController extends Controller
{
    // Método para listar todos os eventos
    public function index()
    {
        $eventos = Evento::all(); // Busca todos os eventos no banco de dados
        return response()->json($eventos); // Retorna os eventos como JSON
    }

    // Outros métodos (store, show, update, destroy) podem ser mantidos ou removidos
}