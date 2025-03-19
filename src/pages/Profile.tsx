import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { userApi } from "@/services/apiService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { currentUser, userProfile, logoutUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  console.log(userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.name || "",
    phone: userProfile?.phoneNumber || "",
    street: userProfile?.address?.street || "",
    city: userProfile?.address?.city || "",
    state: userProfile?.address?.state || "",
    zipCode: userProfile?.address?.zipCode || "",
    country: userProfile?.address?.country || "United States",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedProfile = await userApi.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      });

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update your profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">Loading profile...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cake-text mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-cake-primary/20 flex items-center justify-center text-cake-primary text-2xl font-bold">
                      {userProfile.fullName
                        ? userProfile.fullName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-cake-text/60">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-cake-text/60">Account Type</p>
                    <p className="font-medium capitalize">{userProfile.role}</p>
                  </div>

                  <div>
                    <p className="text-sm text-cake-text/60">Member Since</p>
                    <p className="font-medium">
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {userProfile.role === "vendor" && (
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full border-cake-border"
                        onClick={() => navigate("/vendor/dashboard")}
                      >
                        My Vendor Panel
                      </Button>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full border-cake-border"
                      onClick={() => navigate("/my-orders")}
                    >
                      My Orders
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                ) : null}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-cake-text mb-1"
                        >
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-cake-border focus-visible:ring-cake-primary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-cake-text mb-1"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-cake-border focus-visible:ring-cake-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-cake-text mb-2">
                        Address
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="street"
                            className="block text-sm font-medium text-cake-text mb-1"
                          >
                            Street Address
                          </label>
                          <Input
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-cake-border focus-visible:ring-cake-primary"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-cake-text mb-1"
                            >
                              City
                            </label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="border-cake-border focus-visible:ring-cake-primary"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-cake-text mb-1"
                            >
                              State
                            </label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="border-cake-border focus-visible:ring-cake-primary"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="zipCode"
                              className="block text-sm font-medium text-cake-text mb-1"
                            >
                              ZIP Code
                            </label>
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="border-cake-border focus-visible:ring-cake-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-cake-text mb-1"
                          >
                            Country
                          </label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-cake-border focus-visible:ring-cake-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          className="bg-cake-primary hover:bg-cake-dark text-white"
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-cake-border"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
