<?php
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/event/store', [EventController::class, 'store'])->name('event.store');