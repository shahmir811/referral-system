<?php

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User;
        $admin->name = 'Admin';
        $admin->role = 'admin';
        $admin->email = 'admin@gmail.com';
        $admin->password = bcrypt(123456);
        $admin->contact_number = '+1 123 456789';
        $admin->address = 'Test Address';
        $admin->referred_by = 1;
        $admin->email_verified_at = Carbon::now();
        $admin->is_verified = 1;
        $admin->save();

        // $active2 = new User;
        // $active2->name = 'Active';
        // $active2->role = 'active';
        // $active2->email = 'active2@gmail.com';
        // $active2->password = bcrypt(123456);
        // // $active2->contact_number = '+1 321 456789';
        // $active2->address = 'Test Address';
        // $active2->referred_by = 1;
        // $active2->save();

        // $active3 = new User;
        // $active3->name = 'Active';
        // $active3->role = 'active';
        // $active3->email = 'active3@gmail.com';
        // $active3->password = bcrypt(123456);
        // // $active3->contact_number = '+1 114 456789';
        // $active3->address = 'Test Address';
        // $active3->referred_by = 1;
        // $active3->save();
        
    }
}
