<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role')->default('free');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('contact_number')->unique()->nullable();
            $table->string('address')->nullable();
            $table->string('state')->nullable();
            $table->string('account_number')->nullable();
            $table->string('bank')->nullable();
            $table->string('image')->nullable();
            $table->integer('referred_by')->default(1);
            $table->string('token')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
