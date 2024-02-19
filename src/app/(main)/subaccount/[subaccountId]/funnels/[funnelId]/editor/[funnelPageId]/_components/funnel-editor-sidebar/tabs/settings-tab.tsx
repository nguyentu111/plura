"use client";
import React, { ChangeEventHandler } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlignCenter,
  AlignEndHorizontal,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignStartHorizontal,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/providers/editor/editor-provider";
import { Slider } from "@/components/ui/slider";

type Props = {};

const SettingsTab = (props: Props) => {
  const { state, dispatch } = useEditor();

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https://example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
          {state.editor.selectedElement.type === "video" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Video source</p>
                <Input
                  id="src"
                  placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ?si=wB_VVLSOk0hz40H0"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.src}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0  border-y-[1px]">
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 ">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="left"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Input
              id="DM Sans"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.fontFamily}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Color</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.color ?? undefined,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="color"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.color ?? ""}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "font-weight",
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                className="appearance-none"
                type="number"
                min={0}
                placeholder="px"
                id="fontSize"
                onChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "fontSize",
                      value: e.target.value ? e.target.value + "px" : undefined,
                    },
                  })
                }
                value={
                  String(state.editor.selectedElement.styles.fontSize).split(
                    "px"
                  )[0]
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className=" px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="px"
                      onChange={(e) => {
                        handleOnChanges({
                          target: {
                            id: "height",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        });
                      }}
                      value={
                        String(
                          state.editor.selectedElement.styles.height
                        ).split("px")[0]
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="width"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "width",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(state.editor.selectedElement.styles.width).split(
                          "px"
                        )[0]
                      }
                    />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      type="number"
                      id="marginTop"
                      placeholder="px"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "marginTop",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.marginTop
                        ).split("px")[0]
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="marginBottom"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "marginBottom",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.marginBottom
                        ).split("px")[0]
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="marginLeft"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "marginLeft",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.marginLeft
                        ).split("px")[0]
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="marginRight"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "marginRight",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.marginRight
                        ).split("px")[0]
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="paddingTop"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "paddingTop",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.paddingTop
                        ).split("px")[0]
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="paddingBottom"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "paddingBottom",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.paddingBottom
                        ).split("px")[0]
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="paddingLeft"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "paddingLeft",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.paddingLeft
                        ).split("px")[0]
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      type="number"
                      placeholder="px"
                      id="paddingRight"
                      onChange={(e) =>
                        handleOnChanges({
                          target: {
                            id: "paddingRight",
                            value: e.target.value
                              ? e.target.value + "px"
                              : undefined,
                          },
                        })
                      }
                      value={
                        String(
                          state.editor.selectedElement.styles.paddingRight
                        ).split("px")[0]
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.opacity ===
                "number"
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || "0"
                      ).replace("%", "")
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "opacity",
                    value: `${e[0]}%`,
                  },
                });
              }}
              value={[
                typeof state.editor.selectedElement.styles?.opacity === "number"
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || "0"
                      ).replace("%", "")
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <Input
              type="number"
              placeholder="px"
              id="borderRadius"
              onChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: e.target.value ? e.target.value + "px" : undefined,
                  },
                })
              }
              value={
                String(state.editor.selectedElement.styles.borderRadius).split(
                  "px"
                )[0]
              }
            />

            {/* <Input
              placeholder="px"
              onChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: `${e.target.value}px`,
                  },
                });
              }}
              value={
                typeof state.editor.selectedElement.styles?.borderRadius ===
                "number"
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || "0"
                      ).replace("%", "")
                    ) || 0
              }
            /> */}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "backgroundSize",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="cover"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="contain"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={22} />
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <LucideImageDown size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: "display",
                    value: va.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
            <Label
              className="text-muted-foreground cursor-pointer"
              htmlFor="display"
            >
              Flex
            </Label>
          </div>
          <div>
            <Label className="text-muted-foreground">Justify Content</Label>

            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "justifyContent",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.justifyContent}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="space-between"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceBetween size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="space-evenly"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalSpaceAround size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignHorizontalJustifyCenterIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="start"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignHorizontalJustifyStart size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="end"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignHorizontalJustifyEndIcon size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <Label className="text-muted-foreground">Align Items</Label>
            <Tabs
              style={{ alignItems: "stretch" }}
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "alignItems",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.alignItems}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="start"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignStartHorizontal size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={18} />
                </TabsTrigger>

                <TabsTrigger
                  value="end"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignEndHorizontal size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Label className="text-muted-foreground"> Direction</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "flexDirection",
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.alignItems}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="row"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <StretchHorizontal size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="column"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <StretchVertical size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsTab;
