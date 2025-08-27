"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const tFooter = useTranslations("Footer");

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl">EnglishMaster</span>
            </div>
            <p className="text-gray-600">{tFooter("description")}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{tFooter("learning.title")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("learning.courses")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("learning.grammarGuide")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("learning.vocabulary")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("learning.pronunciation")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{tFooter("practice.title")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("practice.speaking")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("practice.writing")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("practice.listening")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("practice.reading")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{tFooter("support.title")}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("support.helpCenter")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("support.community")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("support.tutoring")}</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">{tFooter("support.contact")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">© 2024 EnglishMaster. {tFooter("rights")}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* social icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
