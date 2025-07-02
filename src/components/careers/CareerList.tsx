'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type CareerData = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  summary: string;
};  

interface CareerFilterProps {
  departments: string[];
  locations: string[];
  selectedDepartment: string;
  selectedLocation: string;
  onDepartmentChange: (dept: string) => void;
  onLocationChange: (loc: string) => void;
}

const CareerFilter = ({
  departments, locations,
  selectedDepartment, selectedLocation,
  onDepartmentChange, onLocationChange
}: CareerFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-2">Department</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedDepartment === "" ? "default" : "outline"}
            size="sm"
            onClick={() => onDepartmentChange("")}
            className="rounded-full"
          >
            All
          </Button>
          {departments.map(dept => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              size="sm"
              onClick={() => onDepartmentChange(dept)}
              className="rounded-full"
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedLocation === "" ? "default" : "outline"}
            size="sm"
            onClick={() => onLocationChange("")}
            className="rounded-full"
          >
            All
          </Button>
          {locations.map(loc => (
            <Button
              key={loc}
              variant={selectedLocation === loc ? "default" : "outline"}
              size="sm"
              onClick={() => onLocationChange(loc)}
              className="rounded-full"
            >
              {loc}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerCard = ({ job }: { job: CareerData }) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{job.type}</span>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <span className="mr-4">{job.department}</span>
        <span>{job.location}</span>
      </div>
      <p className="text-sm mb-5">{job.summary}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Posted on {new Date(job.postedDate).toLocaleDateString()}
        </span>
        <Button asChild>
          <Link href={`/careers/${job.id}`}>
            View Details <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

interface CareerListProps {
  careersData: Array<CareerData>;
}

export default function CareerList({ careersData }: CareerListProps) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const departments = [...new Set(careersData.map(job => job.department))];
  const locations = [...new Set(careersData.map(job => job.location))];

  const filteredJobs = careersData.filter(job => {
    if (selectedDepartment && job.department !== selectedDepartment) {
      return false;
    }
    if (selectedLocation && job.location !== selectedLocation) {
      return false;
    }
    return true;
  });

  return (
    <>
      <CareerFilter
        departments={departments}
        locations={locations}
        selectedDepartment={selectedDepartment}
        selectedLocation={selectedLocation}
        onDepartmentChange={setSelectedDepartment}
        onLocationChange={setSelectedLocation}
      />

      <div className="space-y-6 mt-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <CareerCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-12 bg-card rounded-lg border">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-medium mt-4">No positions found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or check back later
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSelectedDepartment("");
                setSelectedLocation("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Don&apos;t see a position that fits your skills?</h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          We&apos;re always looking for talented individuals who are passionate about our mission.
          Send us your resume and tell us how you can contribute.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            Contact Us
          </Link>
        </Button>
      </div>
    </>
  );
}
