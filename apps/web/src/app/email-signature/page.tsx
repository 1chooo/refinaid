"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Clipboard, Save } from "lucide-react"
import Container from "@/components/container"
import Title from "@/components/title"
import Image from "next/image"

interface SignatureData {
  name: string
  jobTitle: string
  secondaryTitle: string
  phone: string
  headshotUrl: string
}

export default function SignatureCustomizer() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: "ChunHo (Hugo) Lin",
    jobTitle: "Software Engineer",
    secondaryTitle: "",
    phone: "W: 012-345-6789",
    headshotUrl:
      "https://www.1chooo.com/favicon.ico",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignatureData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Container className='flex flex-col items-center justify-center'>
      <Title title="E-mail Signature Generator" />
      <div className="min-h-screen bg-gray-50 mt-12">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1C1C1C] text-white">
          <h1 className="text-xl font-bold">1chooo</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
              <Clipboard className="w-4 h-4 mr-2" />
              Copy as HTML
            </Button>
            <Button className="bg-[#D84B6C] hover:bg-[#C23A5B]">
              <Save className="w-4 h-4 mr-2" />
              Save Your Signature
            </Button>
          </div>
        </div>

        <div className="container mx-auto py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <h2 className="font-semibold text-gray-700">YOUR PHOTO</h2>
                <div className="space-y-2">
                  <Label htmlFor="headshotUrl">📎 Headshot URL</Label>
                  <div className="flex gap-2">
                    <Input
                      className="text-black"
                      id="headshotUrl"
                      name="headshotUrl"
                      value={signatureData.headshotUrl}
                      onChange={handleInputChange}
                      placeholder="(optional)"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <h2 className="font-semibold text-gray-700">YOUR DETAILS</h2>
                <div className="space-y-2">
                  <Label htmlFor="name">😊 Your Name</Label>
                  <Input id="name" name="name" value={signatureData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">💼 Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={signatureData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryTitle">🎖 Secondary Title</Label>
                  <Input
                    id="secondaryTitle"
                    name="secondaryTitle"
                    value={signatureData.secondaryTitle}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
              </div>

              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
                <h2 className="font-semibold text-gray-700">CONTACT OPTIONS</h2>
                <div className="space-y-2">
                  <Label htmlFor="phone">🏢 Office Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={signatureData.phone}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Image
                    src={signatureData.headshotUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h2 className="text-xl font-bold">{signatureData.name}</h2>
                    <p className="text-gray-600">{signatureData.jobTitle}</p>
                    {signatureData.secondaryTitle && <p className="text-gray-600">{signatureData.secondaryTitle}</p>}
                    <p className="text-gray-600 mt-2">{signatureData.phone}</p>
                    <p className="text-[#D84B6C]">jeff@awarehq.com</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 mt-2">111 Liberty Street · Suite 102 · Columbus, OH 43215</p>
                  <div className="flex gap-2 mt-2 text-[#D84B6C]">
                    <a href="#" className="hover:underline">
                      Website
                    </a>
                    <span>·</span>
                    <a href="#" className="hover:underline">
                      LinkedIn
                    </a>
                    <span>·</span>
                    <a href="#" className="hover:underline">
                      Twitter
                    </a>
                    <span>·</span>
                    <a href="#" className="hover:underline">
                      Facebook
                    </a>
                    <span>·</span>
                    <a href="#" className="hover:underline">
                      Instagram
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  )
}
