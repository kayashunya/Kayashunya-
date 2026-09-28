import { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  X, 
  FolderPlus, 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Video, 
  Headphones, 
  Layers 
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import type { CourseContent, CourseModule, CourseLesson } from '../../types/cms';

export function CoursesAdmin() {
  const { courseList, saveCourseItem, sendToTrash, restoreItem, purgePermanently } = useCms();
  const [editingCourse, setEditingCourse] = useState<CourseContent | null>(null);

  const handleCreateNew = () => {
    const newCourse: CourseContent = {
      id: `course_${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      category: 'Advaita Vedanta',
      instructor: 'Acharya Kayashunya',
      coverImageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800',
      durationHours: 10,
      modulesCount: 1,
      lessonsCount: 1,
      status: 'published',
      modules: [
        {
          id: `mod_${Date.now()}`,
          title: 'Module 1: Orientation & Foundations',
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}`,
              title: 'Lesson 1.1: The Core Inquiry',
              durationMinutes: 20,
              type: 'video',
              order: 1,
              isFreePreview: true,
            },
          ],
        },
      ],
    };
    setEditingCourse(newCourse);
  };

  const handleSave = async () => {
    if (!editingCourse || !editingCourse.title.trim()) return;
    const modulesCount = editingCourse.modules.length;
    const lessonsCount = editingCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    await saveCourseItem({
      ...editingCourse,
      modulesCount,
      lessonsCount,
    });
    setEditingCourse(null);
  };

  const handleAddModule = () => {
    if (!editingCourse) return;
    const newMod: CourseModule = {
      id: `mod_${Date.now()}`,
      title: `Module ${editingCourse.modules.length + 1}: New Topic`,
      order: editingCourse.modules.length + 1,
      lessons: [],
    };
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newMod],
    });
  };

  const handleAddLesson = (moduleIndex: number) => {
    if (!editingCourse) return;
    const targetModule = editingCourse.modules[moduleIndex];
    const newLesson: CourseLesson = {
      id: `les_${Date.now()}`,
      title: `Lesson ${moduleIndex + 1}.${targetModule.lessons.length + 1}: New Lesson`,
      durationMinutes: 15,
      type: 'video',
      order: targetModule.lessons.length + 1,
    };
    const updatedModules = [...editingCourse.modules];
    updatedModules[moduleIndex] = {
      ...targetModule,
      lessons: [...targetModule.lessons, newLesson],
    };
    setEditingCourse({ ...editingCourse, modules: updatedModules });
  };

  const handleDeleteModule = (moduleIndex: number) => {
    if (!editingCourse) return;
    const updated = editingCourse.modules.filter((_, i) => i !== moduleIndex);
    setEditingCourse({ ...editingCourse, modules: updated });
  };

  const handleDeleteLesson = (moduleIndex: number, lessonIndex: number) => {
    if (!editingCourse) return;
    const updatedModules = [...editingCourse.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    setEditingCourse({ ...editingCourse, modules: updatedModules });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span>Master Courses & Curriculum CMS</span>
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Hierarchical Course Structure: Course → Module → Lesson → Content (Video, Audio, Text, PDFs).
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {courseList.map((course) => (
          <div
            key={course.id}
            className={`p-4.5 rounded-xl border flex flex-col justify-between ${
              course.status === 'trash' ? 'bg-stone-950 border-red-500/20' : 'bg-stone-900 border-stone-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{course.category}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                  course.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-stone-800 text-stone-400'
                }`}>
                  {course.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-2">{course.title}</h4>
              <p className="text-xs text-stone-400 mt-1 line-clamp-2">{course.subtitle || course.description}</p>

              <div className="mt-3 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                <span>{course.modules?.length || 0} Modules</span>
                <span>·</span>
                <span>{course.durationHours} Hours</span>
                <span>·</span>
                <span>{course.instructor}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[11px]">Instructor: {course.instructor}</span>
              <div className="flex items-center gap-2">
                {course.status === 'trash' ? (
                  <>
                    <button
                      onClick={() => restoreItem('courses', course.id, course.title)}
                      className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => purgePermanently('courses', course.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => sendToTrash('courses', course.id, course.title)}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Curriculum Editor Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingCourse.title ? `Edit Course: ${editingCourse.title}` : 'Create Master Course'}
                </h3>
                <span className="text-[11px] text-stone-400">Curriculum Builder & Lessons</span>
              </div>
              <button onClick={() => setEditingCourse(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Instructor</label>
                <input
                  type="text"
                  value={editingCourse.instructor}
                  onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Course Description</label>
              <textarea
                rows={2}
                value={editingCourse.description}
                onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-850 border border-stone-700 text-xs text-white"
              />
            </div>

            {/* Modules & Lessons Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Modules & Lessons Hierarchy
                </h4>
                <button
                  type="button"
                  onClick={handleAddModule}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-750 text-xs text-stone-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Module</span>
                </button>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {editingCourse.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="p-3.5 rounded-xl bg-stone-850 border border-stone-700/60 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) => {
                          const updated = [...editingCourse.modules];
                          updated[modIdx].title = e.target.value;
                          setEditingCourse({ ...editingCourse, modules: updated });
                        }}
                        className="flex-1 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-xs font-semibold text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddLesson(modIdx)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold"
                      >
                        + Lesson
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteModule(modIdx)}
                        className="text-stone-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Lesson Rows */}
                    <div className="space-y-1.5 pl-4 border-l-2 border-stone-700">
                      {mod.lessons.map((les, lesIdx) => (
                        <div key={les.id} className="flex items-center gap-2 text-xs">
                          <input
                            type="text"
                            value={les.title}
                            onChange={(e) => {
                              const updated = [...editingCourse.modules];
                              updated[modIdx].lessons[lesIdx].title = e.target.value;
                              setEditingCourse({ ...editingCourse, modules: updated });
                            }}
                            className="flex-1 px-2 py-1 rounded-md bg-stone-900 border border-stone-700 text-[11px] text-stone-200"
                          />
                          <select
                            value={les.type}
                            onChange={(e) => {
                              const updated = [...editingCourse.modules];
                              updated[modIdx].lessons[lesIdx].type = e.target.value as CourseLesson['type'];
                              setEditingCourse({ ...editingCourse, modules: updated });
                            }}
                            className="px-2 py-1 rounded-md bg-stone-900 border border-stone-700 text-[10px] text-stone-300"
                          >
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="text">Text</option>
                            <option value="pdf">PDF</option>
                          </select>
                          <input
                            type="number"
                            value={les.durationMinutes}
                            onChange={(e) => {
                              const updated = [...editingCourse.modules];
                              updated[modIdx].lessons[lesIdx].durationMinutes = parseInt(e.target.value) || 10;
                              setEditingCourse({ ...editingCourse, modules: updated });
                            }}
                            className="w-14 px-1.5 py-1 rounded-md bg-stone-900 border border-stone-700 text-[10px] text-stone-300 text-center"
                            title="Duration Minutes"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteLesson(modIdx, lesIdx)}
                            className="text-stone-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
              <button onClick={() => setEditingCourse(null)} className="px-4 py-2 rounded-xl bg-stone-800 text-xs text-stone-300">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                Save Complete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
